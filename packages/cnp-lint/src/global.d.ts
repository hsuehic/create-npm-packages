declare module 'node-status' {
  interface Options {
    invert?: boolean;
    interval?: number;
    /**
     * format
     * e.g 'Doing work: {uptime}  |  {spinner.cyan}  |  {pizza.bar}'
     */
    pattern?: string;
  }

  interface ItemOptions {
    /**
     * Can specify a starting count if needed.
     */
    count?: number;
    /**
     * Will cause 'count' type to display as count/max. Required for some display types. Can be a number or a function that returns a number.
     */
    max?: number;
    /**
     * a function run when the pattern {<item>.custom} is used. Access this.count and this.max for values if needed. Must return a string.
     * @returns string;
     */
    custom?: () => string;
    /**
     * The precision used in percentages.
     */
    precision?: number;
    /**
     * An array of strings that identify steps for the item. The count of the item identifies the current step.
     */
    steps?: string[];
  }

  interface Item {
    inc: (amount?: number) => void;
    dec(amount?: number): void;
    doneStep(success: boolean, message?: string): void;
    count: number;
    steps: string[];
    max: number;
  }

  export declare function start(options: Options): void;
  export declare function addItem(name: string, options: ItemOptions): Item;
  export declare function stop(): void;
  export declare function console(): Console;
  export declare function removeAll(): void;
  export declare function removeItem(name: string);
}
