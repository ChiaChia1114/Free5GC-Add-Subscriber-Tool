# Free5GC_Sub_Tool
A tool for Free5gc add multiple subscribers in the webconsole.

## Overview
![image](https://user-images.githubusercontent.com/73049165/147677715-fe1686b0-2eb7-4936-b97e-689bd5290171.png)


Subscriber Tool can add multiple subscribers into your free5gc MongoDB. You can use this tool to add subscribers and use UERANSIM to register multiple UE in your Free5GC.

## Features
- Subscriber: Add the subscribers with free5gc in a fashion way.


## Pre-request

- PC is running.
- Free5GC v3.0.6
- MongoDB installed.
- Free5GC Webconsole is running.
- UERANSIM

## Configuration

There has one think you need to do is change the `url` in the `sub.js`. Please follow the tutorial to change your config.

- Replace your free5gc ip address.
**sub.js**
```javascript=39
var url = "http://<free5gc ip>:5000/api/subscriber/" + subscriber[min].toString() + "/20893"; //Replace your free5gc ip address.
```
```javascript=93
var url = "http://<free5gc ip>:5000/api/subscriber/" + subscriber[min].toString() + "/20893"; //Replace your free5gc ip address.
```
>**NOTE**：If you want to config other topic like OP value, KeyValue, PlmnID...etc. Please change in Config in `sub.js`. Or if don't know how to change it, please contact me directly.

## Usage
- Running your Free5GC webconsole.
- Open the `sub.html` file.

**Add Subscribers**：
- Type the UE range that you want to register.
- Click `Subscribe`

**Delete Subscribers**：
- Type the UE range that you just registered.
- Click `Delete`

>**NOTE**：The Supi is begining from `imsi-208930000000000`, so please notice that you need to change your UERANSIM Free5GC_ue config.


**Using UERAMSIM connect to Free5gc with multiple subscribers**
#### Pre-request
- Open your UERANSIM
- connect your gNB to your Free5GC. 

#### Setting your free5gc_ue config.
- Change the ueId from `imsi-208930000000000`
- Type the command below to run multiple UE.

Sample：
```shell=
$ sudo build/nr-ue -c config/free5gc-ue.yaml -n <quantity>
```
Example：
```shell=
$ sudo build/nr-ue -c config/free5gc-ue.yaml -n 10
```

