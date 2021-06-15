# 0.0.0 (2021-06-15)


### Bug Fixes

* adapt to new guilded ws changes. Fixes [#11](https://github.com/zaida04/guilded.js/issues/11) ([7756ecd](https://github.com/zaida04/guilded.js/commit/7756ecd575c026b5f95a64730f506aaef1f9fe81))
* add typing for message reaction delete in client class ([2cc79da](https://github.com/zaida04/guilded.js/commit/2cc79dac1b43de1d7220916638def50871e64979))
* exports ([c1c9344](https://github.com/zaida04/guilded.js/commit/c1c9344486a2b99f587243f45ae101a8a5de77f2))
* fetch message url query string correction ([cf9c306](https://github.com/zaida04/guilded.js/commit/cf9c30662430366e04634fe59c7f58042841344f))
* fix message fetching ([0adb063](https://github.com/zaida04/guilded.js/commit/0adb063c4ccf2ceecf34ed9d3fcb6a3ae209093f))
* lerna release ([42a59a4](https://github.com/zaida04/guilded.js/commit/42a59a4a645c5ee00790147b3afebd88e13c9907))
* properly pass needed cookies through ws. Closes [#12](https://github.com/zaida04/guilded.js/issues/12) ([4a46dbf](https://github.com/zaida04/guilded.js/commit/4a46dbfb21642fd82b0b76f015507d2ab2d4ebe7))
* reexport uuid properly ([1b34848](https://github.com/zaida04/guilded.js/commit/1b348489b3d0637f4f7f628772f9616db2672a1a))
* remove race condition for message caching ([1a2d13f](https://github.com/zaida04/guilded.js/commit/1a2d13f06a925ca5ead73512a4f7c351ab76a45d))
* user aboutinfo can be null ([1866022](https://github.com/zaida04/guilded.js/commit/186602245946b07bdac205f4154ed790c9f35411))
* UserManager#fetch not adding to cache correctly ([9164ef5](https://github.com/zaida04/guilded.js/commit/9164ef562e5b573f7b39c13a9b8a32efab4fd9d4))
* **api-typings:** correct export ([a378ec8](https://github.com/zaida04/guilded.js/commit/a378ec80e48ad32bb16b999b6a10d70021e5e4a5))


### Features

* accessors, new structures, new methods, and more! ([7393095](https://github.com/zaida04/guilded.js/commit/7393095340dda87372961599098f41d2a582f9c6))
* added message caching ([cf80998](https://github.com/zaida04/guilded.js/commit/cf809981f9302ba9e34ea707e70bffbaa6f448f0))
* create/delete invite, methods moved from object to manager ([#13](https://github.com/zaida04/guilded.js/issues/13)) ([ad912ab](https://github.com/zaida04/guilded.js/commit/ad912abaf034254e3375b4b138420c2cf05cc1c9))
* created typings for multiple api requests and fixed params for various structures ([bb9ff25](https://github.com/zaida04/guilded.js/commit/bb9ff2561f5cfc333bd8229ab8d103e7b92a0269))
* embed package ([d4d4469](https://github.com/zaida04/guilded.js/commit/d4d4469cd0928ab5726de1082dacd615108813a3))
* emit events on final disconnect and reconnect ([1c9b607](https://github.com/zaida04/guilded.js/commit/1c9b6072525be2c0cfb11e06c610e4f66f21383e))
* implement reconnects and other meta stuff ([b5e30c5](https://github.com/zaida04/guilded.js/commit/b5e30c565b4d8b314e422d2c58d67b5b6c29d4ab))
* partial message and message updates ([4aceaa1](https://github.com/zaida04/guilded.js/commit/4aceaa182a7d119296a30b3f9c10d71d8dfef9bb))
* reactions handled, improved data type for message ([514fc8e](https://github.com/zaida04/guilded.js/commit/514fc8e08918b18fbbb17e64ed84a12acdc73a2d))
* REWRITE ([0f04b82](https://github.com/zaida04/guilded.js/commit/0f04b82c4c39c08880ad96287aaec1e48513f9a5))
* role addition/removal ([b2ed823](https://github.com/zaida04/guilded.js/commit/b2ed823e388c76912aafe0c3112919c6fddc4589)), closes [shrimp#0001](https://github.com/shrimp/issues/0001)
* support for reaction removals ([1ec5a5c](https://github.com/zaida04/guilded.js/commit/1ec5a5ce78c68bdde5a41e51faf34e21c4e0b93c))
* switch from default exports/imports to regular ones ([788205e](https://github.com/zaida04/guilded.js/commit/788205e76c02e4366b8443bf8eacfda385ed22af))
* webhook client, common package, overall cleanup ([5a2288c](https://github.com/zaida04/guilded.js/commit/5a2288c22df0c7ebeb31701d9918e987df1327f9))
* **client:** redone client and exports ([06c596f](https://github.com/zaida04/guilded.js/commit/06c596f3224c1d702297df1f842f9fb3607bebf4))
* **Message:** finish sending functionality ([7ea65bf](https://github.com/zaida04/guilded.js/commit/7ea65bfb7ac5bf570bcb033cef6b8784922aea03))
* **structures:** add placeholder structures for various categories and renamed package ([ae91211](https://github.com/zaida04/guilded.js/commit/ae9121172cb269ab0e1f2937ae5e1efd8dde4527))
* **structures:** Lots of completed structures ([5d4aed6](https://github.com/zaida04/guilded.js/commit/5d4aed65bc239cafbaf1d6b3350eea69b9aa0074))
* **typings:** api-typings completed to usable state ([349f46c](https://github.com/zaida04/guilded.js/commit/349f46c8bcab4a00e512bd150eddd3061f402454))
* **ws:** gateway handlers with a heartbeater ([35c0d1e](https://github.com/zaida04/guilded.js/commit/35c0d1e3b8bafb8bd0a62c63ceaf90549ac9b30d))


### Reverts

* **husky-lint:** revert incorrect husky update ([066de64](https://github.com/zaida04/guilded.js/commit/066de643c0d145a956b638e5fd613762da1ff6e2))



