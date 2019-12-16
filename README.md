# < Full Stack Test > - Beers REST API

The Front-end part of this project is on  [Client Repository](https://github.com/Olga1305/fullstack-test-react). 

## Documentation
----
## Rest Endpoint:
`http://localhost:3001/api`

## Beers API endpoints:

**Get All Beers**
----
  Returns json data with all beers.
  
  | URL | Method | Params | Data Params | Success response | Error response|
  |--|--|--|--|--|--|
  |`/`|GET|None|None|Status 200|Status 404|


**Get Paginated Beers**
----
  Returns json data with 20 beers per page.
  
  | URL | Method | Params | Data Params | Success response | Error response|
  |--|--|--|--|--|--|
  |`/page/:currentPage`|GET|`currentPage=[Number]`|None|Status 200|Status 404|

**Get Searched Beers**
----
  Returns json data with searched by name beers.
  
  | URL | Method | Params | Data Params | Success response | Error response|
  |--|--|--|--|--|--|
  |`/:query`|GET|`query=[String]`|None|Status 200|Status 400 |

**Get Single Beer**
----
  Returns json data with a single beer.
  
  | URL | Method | Params | Data Params | Success response | Error response|
  |--|--|--|--|--|--|
  |`/single/:id`|GET|`id=[Number]`|None|Status 200|Status 400 |
