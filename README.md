# Welcome to tt-live

TT-live is a live ticker application to send live updates of your matches to friends and club members.
Additionally to the live score, it also provides an integrated  chat.
Multiple match systems and are included. For a full list of features look #here
Soon support for tournaments will be added as well.


# Project Overview

TT-Live combines a JavaEE backend with a React frontend. It contains multiple maven projects:

```  
── tt-live
    ├── ttlive-ear -> Project for assembling the final ear 
    ├── ttlive-ejb -> Contains all the backend logic
    ├── ttlive-war -> Contains all the REST endpoints and handles Authentification
    └── ttlive-web -> Contains the REACT project
```


# 