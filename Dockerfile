FROM ubuntu:16.04

RUN apt-get update && apt-get install -y openssh-server nodejs npm
RUN mkdir /var/run/sshd
RUN echo 'root:THEPASSWORDYOUCREATED' | chpasswd
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

ADD package.json /

RUN npm install n -g
RUN n stable
RUN apt purge -y nodejs npm
RUN npm install

ADD wrapper_script.sh /
ADD app.js /
ADD config/ /config
ADD public/ /public

EXPOSE 22 3000
CMD ["/wrapper_script.sh"]
