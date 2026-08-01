# Changelog

## [1.1.1](https://github.com/eduardo-gms/pivot/compare/pivot-backend-v1.1.0...pivot-backend-v1.1.1) (2026-08-01)


### Bug Fixes

* **backend:** configure trust proxy, remove debug middleware and condition swagger ([8760296](https://github.com/eduardo-gms/pivot/commit/8760296d4d76e986b0ccbd70cf95f0ddf27e310a))
* remediate audit findings and enhance security and CI ([0ceef3c](https://github.com/eduardo-gms/pivot/commit/0ceef3c3c8f264899aeca41ac5bbd8ea1e0c9a2d))

## [1.1.0](https://github.com/eduardo-gms/pivot/compare/pivot-backend-v1.0.0...pivot-backend-v1.1.0) (2026-07-30)


### Features

* add global exception filter with Prisma error mapping ([86a02aa](https://github.com/eduardo-gms/pivot/commit/86a02aa19a811fae0a5de8503786e435eac75160))
* apply v3 core fixes, testing, and infra improvements ([d6066a5](https://github.com/eduardo-gms/pivot/commit/d6066a571ca622f2a36904fdbc48df1280ea98a7))
* **db:** add initial schema migration ([65c8c3e](https://github.com/eduardo-gms/pivot/commit/65c8c3e277dcaf5b4714d7e4e19e33a68e8cca62))
* implement priority queue, linked lists, and swap animations ([32704ba](https://github.com/eduardo-gms/pivot/commit/32704baf989ab16eb1e44e2b356bacc0372100e6))
* initialize frontend and backend scaffolding ([b079198](https://github.com/eduardo-gms/pivot/commit/b079198d9d6f7e786a4e5327ff067567fcabbe80))
* setup base backend, frontend foundation, simulation engine, and i18n ([bf383f8](https://github.com/eduardo-gms/pivot/commit/bf383f85c97827872c1e70b357cb8d8ce4c3a52e))
* **ui:** redesign algorithm dashboard to match new dark mode mockup ([3bd6e03](https://github.com/eduardo-gms/pivot/commit/3bd6e030d45ffbe0cf8fce4c392c2ff1599e3b15))
* Unify Dashboard and Blog, add global Search and Light Mode toggle ([72f7d91](https://github.com/eduardo-gms/pivot/commit/72f7d91bebdd59b646472466c77404172c5a8d47))


### Bug Fixes

* apply multiple infrastructure and frontend improvements ([9d9fbfc](https://github.com/eduardo-gms/pivot/commit/9d9fbfc8072f9573e8ad839475aeb3069b0c4a31))
* **backend:** compile seed to js and run with node to bypass ts-node in prod ([d03f5f3](https://github.com/eduardo-gms/pivot/commit/d03f5f300396f11889b77371ce1d161372d31010))
* **backend:** resolve TypeScript implicit any in main.ts and adjust E2E pagination assertions ([8ed1e9b](https://github.com/eduardo-gms/pivot/commit/8ed1e9bcb4c3bf0364a9bdef237b957b81b4e6b3))
* **ci:** reorder prisma generation before tests and resolve high/critical vulnerabilities ([3405905](https://github.com/eduardo-gms/pivot/commit/340590537ea6f7bddc73f47477a70513c633446f))
* correct CI build failures ([1ccadf3](https://github.com/eduardo-gms/pivot/commit/1ccadf35f52f37857593983a52608e961bb19177))
* corrige erros identificados na análise do projeto ([e15d54e](https://github.com/eduardo-gms/pivot/commit/e15d54e7a09b80b1f3e03c12967e05855541f752))
* docker configs and azure deployment optimizations ([b07690a](https://github.com/eduardo-gms/pivot/commit/b07690a749dcf39a956df7918d49a3d6f60baa18))
* operational improvements — health checks, exception filter, CI/CD split, security headers ([f7f2207](https://github.com/eduardo-gms/pivot/commit/f7f22074dccb92992ddec2b01ef0a3ba06b6c166))
* resolve 13 critical issues across backend and frontend ([91770e3](https://github.com/eduardo-gms/pivot/commit/91770e3324e0f100b5d8f4da845d97dc2e5c5138))
* resolve 7 technical debts ([426c8ab](https://github.com/eduardo-gms/pivot/commit/426c8ab14824fc7278ca74d4f0638c47cf006b34))
* resolve container crashes on startup ([4788087](https://github.com/eduardo-gms/pivot/commit/47880879464ced7f4e5fe59816b374090f772d1c))
* resolve Nginx envsubst variables, optimize Dockerfile, and add Prisma indexes ([31a75d5](https://github.com/eduardo-gms/pivot/commit/31a75d5bd8907c88d58162bbce9dac46e580b49d))
* separate health check into liveness and readiness probes ([9417635](https://github.com/eduardo-gms/pivot/commit/941763513acd232afbc481a89418230e01d6e821))
* set NODE_ENV=production in Dockerfile ([d7ea6ec](https://github.com/eduardo-gms/pivot/commit/d7ea6ecd78c5bb97f3cccf23925a6cf9125f3dfb))
