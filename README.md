# Polarity CRITs Integration 

The Polarity CRITs integration allows Polarity to search your CRITs deployment for IPs, Hashes, and Domains in real-time.


CRITs is an open source malware and threat repository that leverages other open source software to create a unified tool for analysts and security experts engaged in threat defense. It has been in development since 2010 with one goal in mind: give the security community a flexible and open platform for analyzing and collaborating on threat data. For more information about CRITs please see [https://crits.github.io]().


| ![image](https://cloud.githubusercontent.com/assets/306319/24310755/86b712d2-10a7-11e7-8469-9c69184f450b.png)
 |
|---|
|*CRITs Lookup of MD5 Hash* |

## Supported Types

### Domains

Domains are currently searched as their own resource (not as an indicator) by querying the URL `/api/v1/domains`.

### IP Addresses

The Polarity CRITs integration currently searches for IPv4 and IPv6 (including RFC 1918 addresses) entities as a resource by querying the URL `/api/v1/ips`.  

### Hashes

Hashes of type MD5, SHA1, and SHA256 are currently searched as both indicators and samples.   When being searched as an indicator the URL queried is `/v1/api/indicators?c-type=<hashType>&c-lower=<hashValue>`.  When hashes are searched as samples the URL queried is `/api/v1/samples/?c-<hashType>=<hashValue>`.  

## Installation Instructions

You can install an integration by downloading the file from github, or by using git to clone the repo into your instance.

### Install from Zip/Tar File

1. Navigate to the [polarityio/crits releases page](https://github.com/polarityio/crits/releases).
2. Download the `tar.gz` file for the version of the integration you want to install (we typically recommend installing the latest version of the integration).
3. Upload the `tar.gz` file to your Polarity Server.
4. Move the `tar.gz` file to the Polarity Server integrations directory.

 ```bash
 mv <filename> /app/polarity-server/integrations
 ```

5. Once the file has been moved, navigate to the integrations folder:

 ```bash
 cd /app/polarity-server/integrations
 ```
  
6. Extract the tar file:

 ```bash
 tar -xzvf <filename>
 ```

6. Navigate into the extracted folder for the new integration:

 ```bash
cd <filename>
```

7. Install the integration's dependencies:

 ```bash
npm install
```

8. Ensure the integration directory is owned by the `polarityd` user
 
 ```bash
chown -R polarityd:polarityd /app/polarity-server/integrations/crits
```

9. Restart your Polarity-Server

 ```bash
service polarityd restart
```

10. Navigate to the integrations page in Polarity-Web to configure the integration.

### Installing via GIT Clone

1. Navigate to the integrations folder:

 ```bash
cd /app/polarity-server/integrations
```

2. Clone a specific version of the CRITs repo using git:

 ```bash
git clone --branch <version> https://github.com/polarityio/crits.git
```

3. Change into the integration directory

 ```bash
cd CRITs
```

4. Use `npm` to install the integration's dependencies

 ```bash
npm install
```

5.  Ensure the integration directory is owned by the `polarityd` user

 ```bash
chown -R polarityd:polarityd /app/polarity-server/integrations/crits
```

6. Restart your Polarity-Server

 ```bash
service polarityd restart
```

7. Navigate to the integrations page in Polarity-Web to configure the integration

## Polarity

Polarity is a memory-augmentation platform that improves and accelerates analyst decision making.  For more information about the Polarity platform please see: 

https://polarity.io/
