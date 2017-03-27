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

## CRITs Integration Options

### CRITs Hostname

The hostname for your CRITs server including "http://" or "https://" as required.

### API Key

Your API key for authenticating to CRITs

### Username

Your CRITs username.

### Lookup IP Address Resources

If checked, the integration will lookup IP addresses on your screen against your CRITs instance.

### Lookup Hashes

If checked, the integration will lookup MD5, SHA1 and SHA256 indicators on your screen against your CRITs instance.

### Lookup Domains

If checked, the integration will lookup domains on your screen against your CRITs instance.

## Installation Instructions

Installation instructions for integrations are provided on the [PolarityIO GitHub Page](https://polarityio.github.io/).
## Polarity

Polarity is a memory-augmentation platform that improves and accelerates analyst decision making.  For more information about the Polarity platform please see: 

https://polarity.io/
