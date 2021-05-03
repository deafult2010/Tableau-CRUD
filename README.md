# Tableau-CRUD Client Tiering Example

Proof of concept to show the ability to use a custom web page integrated into a Tableau dashboard to implement CRUD functionality on the MySQL DB it sources its data from.

This App uses the MERN Stack (MySQL, Express, React & NodeJS).

The App (https://tableaucrudform.herokuapp.com) has the following 10 end points:

Client end points: <br />
GET&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/:member/:client&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- populates the user facing client for given member and client params

Server end points: <br />
GET&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/tiering&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- JSON Data used as the data source

GET&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/obs_list/:member/:client - gets Obs List JSON Data for given member and client params <br />
POST&nbsp;&nbsp;&nbsp;&nbsp;/obs_list&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- posts req.body to insert row <br />
PUT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/obs_list/:id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- puts req.body for given id param to update row <br />
DELETE&nbsp;/obs_list/:id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- deletes row using given id param in WHERE clause 

GET&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/comments/:member/:client - gets Comments List JSON Data for given member and client params <br />
POST&nbsp;&nbsp;&nbsp;&nbsp;/comments&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- posts req.body to insert row <br />
PUT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/comments/:id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- puts req.body for given id param to update row <br />
DELETE&nbsp;/comments/:id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- deletes row using given id param in WHERE clause <br />

Other package dependencies (aside from the MERN stack): <br />
Client: <br />
create-react-app&nbsp;  - Facebook's react template <br /> 
react-router-dom  - for accessing /:member and /:client URL Params <br />
Server: <br />
cors&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- for providing a Connect/Express middleware that can be used to enable Cross-Origin Resource Sharing (CORS) with various options.


I have a seperate App (https://restapidata.herokuapp.com) that is used to connect to the JSON data using Tableau's Web Data Connector (WDC). I deployed my own version of Keshia Rose's WDC so as to have my own dedicated application for my own use. Keshia Rose's JSON WDC found here https://github.com/KeshiaRose/JSON-XML-WDC
