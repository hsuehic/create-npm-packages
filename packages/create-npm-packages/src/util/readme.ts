import * as path from 'node:path';

import { fs } from 'zx';

export const renderBadges = (owner: string, repo: string): string => {
  return `
<!--badge-variables-->
[lint-img]: https://github.com/${owner}/${repo}/actions/workflows/lint.yaml/badge.svg
[lint-url]: https://github.com/${owner}/${repo}/workflows/lint.yaml
[test-img]: https://github.com/${owner}/${repo}/actions/workflows/test.yaml/badge.svg
[test-url]: https://github.com/${owner}/${repo}/workflows/test.yaml
[build-img]: https://github.com/${owner}/${repo}/actions/workflows/build.yaml/badge.svg
[build-url]: https://github.com/${owner}/${repo}/workflows/build.yaml
[release-img]: https://github.com/${owner}/${repo}/actions/workflows/release.yaml/badge.svg
[release-url]: https://github.com/${owner}/${repo}/workflows/release.yaml
[downloads-img]: https://img.shields.io/npm/dt/${repo}
[downloads-url]: https://www.npmtrends.com/${repo}
[npm-img]: https://img.shields.io/npm/v/${repo}
[npm-url]: https://www.npmjs.com/package/${repo}
[issues-img]: https://img.shields.io/github/issues/${owner}/${repo}
[issues-url]: https://github.com/${owner}/${repo}/issues
[codecov-img]: https://codecov.io/gh/${owner}/${repo}/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/${owner}/${repo}
<!--badge-variables-->
`;
};

export const updateReadme = (githubUsername: string, packageName: string) => {
  const filename = path.resolve(process.cwd(), `README.md`);
  const originalContent = fs.readFileSync(filename, 'utf-8');
  const newContent = originalContent
    .replace(
      /<!--instructions-of-template-->[\s\S]*<!--instructions-of-template-->/gmu,
      ''
    )
    .replace(/<!--package-name-->[\s\S]*<!--package-name-->/gmu, packageName)
    .replace(/my-package-name/gm, packageName)
    .replace(
      /<!--badge-variables-->[\s\S]*<!--badge-variables-->/gmu,
      renderBadges(githubUsername, packageName)
    );
  fs.writeFileSync(filename, newContent);
};
