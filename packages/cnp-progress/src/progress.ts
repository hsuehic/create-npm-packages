'use strict';

import createCharm, { CharmColor } from 'charm';

export interface ProgressOptions {
  total: number;
  pattern?: string;
  textColor?: CharmColor;
  title?: string;
  updateFrequency?: number;
}

const charm = createCharm();
charm.pipe(process.stdout);

class Progress {
  private _barSize = 20;

  private _percent = 0;
  private _percentIncrease = 0;
  private _current = 0;

  private _start = 0;
  private _elapsed = 0;
  private _remaining = 0;
  private _now = 0;
  private _cycle = 0;
  private _timer: NodeJS.Timer = null;

  private _padding: string;

  private _message: string = null;

  private _pattern =
    'Progress: {bar.white.cyan.25} | Elapsed: {elapsed.green} | Remaining: {remaining.blue} | {percent.magenta} | {current.red}/{total.yellow}';
  private _regex = /(.*?){(.*?)}/g;

  /**
   * Creates new progress object
   * @param options
   * @returns {Progress}
   */
  public static create(options: ProgressOptions): Progress {
    return new Progress(
      options.total,
      options.pattern,
      options.textColor,
      options.title,
      options.updateFrequency
    );
  }

  /**
   *
   * @deprecated use Progress.create(options: ProgressOptions)
   */
  constructor(
    private _total: number,
    pattern?: string,
    private _textColor?: CharmColor,
    private _title?: string,
    private _updateFrequency = 100
  ) {
    this._padding = new Array(300).join(' ');
    if (pattern) this._pattern = pattern;
    //this._padding = new Array(300).join('▒');
    this._percentIncrease = 100 / _total;
    this.start();
  }

  /**
   * Update process
   * @param current [optional] update process to current value.
   * @param message [optional] progress message
   * @returns current {number}
   */
  public update(current?: number, message?: string) {
    if (current) {
      this._current = current;
      this._percent = (this._current / this._total) * 100;
      this._message = message;
    } else {
      this._current++;
      this._percent += this._percentIncrease;
    }
    if (this._current >= this._total) {
      this._update();
      return `${this._current}: stop`;
    }
    return this._current;
  }
  /**
   * Updates progress
   */

  public _update(): void {
    this._now = new Date().getTime();
    if (this._current >= this._total) {
      charm.up(1).erase('line').write('\r');
      this._current = this._total - 1;
      this.stop();
      return;
    } else {
      charm.up(1).erase('line').write('\r');
      this._elapsed = (this._now - this._start) / 1000;
      this._remaining =
        (this._elapsed / this._current) * (this._total - this._current);
      this.write();
    }
  }

  /**
   * Finishes progress
   */
  public done(): void {
    this._now = new Date().getTime();
    charm.up(1).erase('line').write('\r');
    this._current = this._total - 1;
    this.stop();
  }

  public start = (): void => {
    charm.erase('line').write('\r');
    this._start = new Date().getTime();
    this._now = new Date().getTime();
    this._cycle = this._start;
    this.renderTitle();
    this.write();
    this._timer = setInterval(() => {
      this._update();
    }, this._updateFrequency);
  };

  private stop = (): void => {
    this._current = this._total;
    this._percent = 100;
    this._elapsed = (this._now - this._start) / 1000;
    this._remaining = 0;
    this.write();
    clearInterval(this._timer);
  };

  private write = (): void => {
    let match = this._regex.exec(this._pattern);
    while (match) {
      this.renderText(match[1]);

      if (match[2].indexOf('.') == -1) {
        this.renderPattern(
          match[2],
          match[2] as keyof typeof this._patternMapping
        );
      } else {
        const tokens = match[2].split('.');
        if (tokens.length == 4 && tokens[0] == 'bar') {
          this.renderBar(
            tokens[1] as CharmColor,
            tokens[2] as CharmColor,
            parseInt(tokens[3])
          );
        } else if (tokens.length == 2) {
          this.renderPattern(
            match[2],
            tokens[0] as keyof typeof this._patternMapping,
            tokens[1] as CharmColor
          );
        }
      }
      match = this._regex.exec(this._pattern);
    }
    charm.write('\r\n');
  };

  private renderElapsed = (color?: CharmColor): void => {
    this.renderItem(`${this._elapsed.toFixed(1)}s`, color);
  };

  private renderRemaining = (color?: CharmColor): void => {
    this.renderItem(`${this._remaining.toFixed(1)}s`, color);
  };

  private renderMemory = (color?: CharmColor): void => {
    this.renderItem(
      `${(process.memoryUsage().rss / 1024 / 1024).toFixed(1)}M`,
      color
    );
  };

  private renderPercent = (color?: CharmColor): void => {
    this.renderItem(`${this._percent.toFixed(0)}%`, color);
  };

  private renderCurrent = (color?: CharmColor): void => {
    this.renderItem(this._current.toString(), color);
  };

  private renderTotal = (color?: CharmColor): void => {
    this.renderItem(this._total.toString(), color);
  };

  private renderMessage = (color?: CharmColor): void => {
    if (this._message) {
      this.renderItem(
        `${this._current}, ${this._total},${this._message}`,
        color
      );
    }
  };

  private renderBar = (
    colorRemaining: CharmColor = 'white',
    colorDone: CharmColor = 'green',
    size?: number
  ): void => {
    if (size && size !== this._barSize) this._barSize = size;
    charm.foreground(colorDone).background(colorDone);
    const done = Math.ceil((this._current / this._total) * this._barSize);

    charm.write(this._padding.substr(0, done));

    charm.foreground(colorRemaining).background(colorRemaining);
    charm.write(this._padding.substr(0, this._barSize - done));
    charm.display('reset');
  };

  private _patternMapping = {
    bar: this.renderBar,
    elapsed: this.renderElapsed,
    remaining: this.renderRemaining,
    memory: this.renderMemory,
    percent: this.renderPercent,
    current: this.renderCurrent,
    total: this.renderTotal,
    message: this.renderMessage,
  } as const;

  private renderPattern = (
    pattern: string,
    item: keyof typeof this._patternMapping,
    color?: CharmColor
  ): void => {
    const renderer = this._patternMapping[item];
    if (renderer) {
      renderer(color);
    } else {
      charm.write(pattern);
    }
  };

  private renderItem = (item: string, color?: CharmColor): void => {
    if (color) {
      charm.foreground(color).write(item);
      charm.display('reset');
    } else {
      charm.write(item);
    }
  };

  private renderText = (text: string): void => {
    if (this._textColor) {
      charm.display('bright').foreground(this._textColor).write(text);
      charm.display('reset');
    } else {
      charm.display('bright').write(text);
      charm.display('reset');
    }
  };

  private renderTitle = (): void => {
    if (this._title && this._title !== '') {
      charm.display('bright').write(this._title);
      charm.display('reset');
      charm.write('\n');
    }
  };

  private skipStep = (): boolean => {
    if (this._updateFrequency == 0) return false;
    const elapsed = this._now - this._cycle;

    if (elapsed < this._updateFrequency) {
      return true;
    } else {
      this._cycle = this._now;
      return false;
    }
  };
}

export { Progress };
