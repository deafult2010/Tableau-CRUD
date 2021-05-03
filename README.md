# Tableau-CRUD Client Tiering Example

Proof of concept to show the ability to use a custom web page integrated into a Tableau dashboard to implement CRUD functionality on the MySQL DB it sources its data from.

This App uses the MERN Stack (MySQL, Express, React & NodeJS).

The App (https://tableaucrudform.herokuapp.com) has the following 10 end points:

Client end points:
GET     /:member/:client          - populates the user facing client for given member and client params

Server end points:
GET     /tiering                  - JSON Data used as the data source

GET     /obs_list/:member/:client - gets Obs List JSON Data for given member and client params
POST    /obs_list                 - posts req.body to insert row
PUT     /obs_list/:id             - puts req.body for given id param to update row
DELETE  /obs_list/:id             - deletes row using given id param in WHERE clause

GET     /comments/:member/:client - gets Comments List JSON Data for given member and client params
POST    /comments                 - posts req.body to insert row
PUT     /comments/:id             - puts req.body for given id param to update row
DELETE  /comments/:id             - deletes row using given id param in WHERE clause

Other package dependencies (aside from the MERN stack):
Client:
create-react-app  - Facebook's react template
react-router-dom  - for accessing /:member and /:client URL Params
Server:
cors              - for providing a Connect/Express middleware that can be used to enable Cross-Origin Resource Sharing (CORS) with various options.


I have a seperate App (https://restapidata.herokuapp.com) that is used to connect to the JSON data using Tableau's Web Data Connector (WDC). I deployed my own version of Keshia Rose's WDC so as to have my own dedicated application for my own use. Keshia Rose's JSON WDC found here https://github.com/KeshiaRose/JSON-XML-WDC
