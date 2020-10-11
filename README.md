# Dbstoretia

This is a project to apply like as intership in the TIA's Technology and Data Science Departament.

The project consists in a application manage consists of displaying relevant or useful information for the user from a limited sales history. Holidays and some important events are held once a year, as well as the opportunity to see how strategic decisions affected results.

DATASET

It is composed of historical sales data for 45 stores located in different regions; each store contains a number of departments. The company also organizes various promotional events of sales throughout the year. These sales precede major holidays


## Requirements
node v12.18.3
all libraries in package.json
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.


## Development server

Run `npm install` for a config the all libraries used in this project.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Project Description
DASHBOARD

![Alt text](https://github.com/NeythLevanest/dashboardstore/blob/main/screenshots/dashboard1.png "Dashboard")

The application has a general dashboard that allows the user to view information related to the status of the different stores and departments of the TIA chain.

In the dashboard we can find four KPI indicators:
- Average Sales per store.
- Unemployment rate per store.
- Consumer price index rate.
- Rate or factor of relativity (increase or decrease in sales) between the average sales of a store in relation to holidays and non-holidays.

You can filter by store, date range and holidays.



![Alt text](https://github.com/NeythLevanest/dashboardstore/blob/main/screenshots/dashboard2.png "Dashboard Departamentos")

It is also possible to view the average sales per department of a certain store, considering the aforementioned filters (date range, store, and holidays)

![Alt text](https://github.com/NeythLevanest/dashboardstore/blob/main/screenshots/dashboard3.png "Dashboard Options Chart")

The side menu gives us access to consult the history of sales related to a particular store. We also have the markdowns option, which allows us to visualize in a table when it has affected, in percentage terms, the application of a certain markdown (we can choose type [1-5]) to the original sale price. On the other hand, we can visualize the total global sales and for each store, as well as how much this contributes as a percentage to the consolidated TIA sales.

![Alt text](https://github.com/NeythLevanest/dashboardstore/blob/main/screenshots/dashboard4.png "Dashboard Options Chart")
![Alt text](https://github.com/NeythLevanest/dashboardstore/blob/main/screenshots/dashboard5.png "Dashboard Options Chart")




## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
