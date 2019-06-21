# Just-API

This is a fork of [kiranz/just-api](https://github.com/kiranz/just-api). It's basically the same package, but with updated dependencies and a few differences. 
 
First off, you get to write spec files in YAML. 

So instead of this:

```yaml
meta:
  name: Starwars suite
configuration:
  scheme: https
  host: swapi.co
  base_path: /api
specs:
  - name: search R2-D2 info
    before_test:
      run_type: inline
      inline:
        function: !js/asyncFunction >
          async function() {
            var response = await this.runSpec('get R2-D2 info');
            var jsonData = JSON.parse(response.body);
            this.test.query_params = { name:  jsonData.name };
          }
    request:
      path: /people
      method: get
    response:
      status_code: 200
      headers:
        - name: content-type
          value: !!js/regexp application/json 
      custom_validator:
        run_type: inline
        inline:
          function: !!js/function >
            function() {
              var jsonData = JSON.parse(this.response.body);
              var r2d2 = jsonData.results.find(result => result.name === 'R2-D2');
              
              if (!r2d2) 
                throw new Error('R2-D2 not returned in search results');
            }
```

You'd write this:

```js
module.exports = {
  meta: {
    name: 'Starwars suite'
  },
  configuration: {
    scheme: 'https',
    host: 'swapi.co',
    base_path: '/api'
  },
  specs: [
    {
      name: 'search R2-D2 info',
      before_test: {
        run_type: 'inline',
        inline: {
          'function': async function() {
              var response = await this.runSpec('get R2-D2 info');
              var jsonData = JSON.parse(response.body);
              this.test.query_params = { name:  jsonData.name };
          }
        }
      },
      request: {
        path: '/people',
        method: 'get'
      },
      response: {
        status_code: 200,
        headers: [
          {
            name: 'content-type',
            value: /application\/json/
          }
        ],
        custom_validator: {
          run_type: 'inline',
          inline: {
            'function': () => {
                var jsonData = JSON.parse(this.response.body);
                var r2d2 = jsonData.results.find(result => result.name === 'R2-D2');
                if (!r2d2) 
                    throw new Error('R2-D2 not returned in search results');
            }
          }
        }
      }
    }
  ]
}
```

This simplifies things for everyone, developer and user.

Another new feature is the `--run-server` option. When you specify this option, just-api will attempt to start your local server using `npm start`. So you don't have to have another terminal open, and you can use this in CI easily.

Also, reports now go into a `.justapi_reports/` folder, and this can't be changed.

There may be more changes coming in the future, but that's all for now.  To install this fork:

```
npm i https://github.com/shalvah/just-api
```

You can also check out the full documentation of the original package at https://kiranz.github.io/just-api/.