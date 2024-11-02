import { NgDocConfiguration } from '@ng-doc/builder';

const NgDocConfig: NgDocConfiguration = {
  repoConfig: {
    url: 'https://github.com/DaveMBush/smart-eslint',
    mainBranch: 'v-next',
    releaseBranch: 'main',
  },
  guide: {
    headerTemplate: './apps/documentation/src/app/header-template.html',
  },
};

export default NgDocConfig;
