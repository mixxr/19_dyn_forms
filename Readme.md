# Dynamic Angular 2 Schema Form

(https://github.com/makinacorpus/angular2-schema-form).

## Usage

```bash
	# Start the server
	npm start
```

and go to `http://localhost:3002` in your browser.


# Note: Jenkins install on Debian

* $ wget -q -O - http://pkg.jenkins-ci.org/debian/jenkins-ci.org.key | sudo apt-key add -
* $ sudo echo "deb http://pkg.jenkins-ci.org/debian binary/" > /etc/apt/sources.list.d/jenkins.list
* $ sudo aptitude update
* $ sudo aptitude install -y jenkins

This will install Jenkins as a service, with a correctly configured startup script in /etc/init.d/jenkins and a corresponding system user called “jenkins”. If you didn’t already have Java installed on your server, it will also install the OpenJDK version of Java.

In case, 
```bash
$ sudo /etc/init.d/jenkins start
```
will start jenkins.

