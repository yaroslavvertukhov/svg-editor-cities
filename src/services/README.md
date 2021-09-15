# API

Stores all axios requests in this service.

Entrypoint for all requests is **index.js** ('./index')

## Add request

1. Use one of the existing modules or create a new one at **'./modules'**.
2. Import axiosFactory from './axios-factory'
3. Create new function and add axios request as usual using axiosFactory

```
// example-module.js 

import axiosFactory from '@/services/api/axios-factory';

export default { 
    login: (payload) => axiosFactory(false).post('/login', {...payload})
};
```

> P.S. axiosFactory returns an axios instance, so you can call anything, i.e. get() or post(), as you used
to

4. Import new module in **'./index'** and set it to **methods** object`s property

## Use request
1. In components - API is available via $api, call $api.<module-name>.<module-function>
```
...
created() {
    this.$api.auth.login(payload).then((response) => {
        ...
    })
}
...
```
2. In Vuex - import API entrypoint './index'
```
// Vuex example-module.js

import api from '@/services/api/index'

export default {
    actions: {
        login: (context, payload) => {
            api.auth.login(payload).then((response) => {
                ...
            })
        }
    }
    ...
}
```