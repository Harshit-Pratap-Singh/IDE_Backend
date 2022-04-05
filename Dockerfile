FROM node:16.13.0
WORKDIR /app


#RUN python3.6
RUN  apt-get update -y
RUN apt-get install -y python

# RUN apt-get update && \
#     apt-get install -y openjdk-8-jdk && \
#     apt-get install -y ant && \
#     apt-get clean;
# RUN java pp.class
# add-apt-repository ppa:webupd8team/java
# sudo apt-get update
# sudo apt-get install oracle-java7-installer
RUN apt install software-properties-common -y
# RUN add-apt-repository -y ppa:webupd8team/java
RUN apt update
RUN  apt install -y default-jre 
RUN  apt install -y default-jdk 
# RUN  apt-get install openjdk-8-jdk
RUN python3 --version

RUN add-apt-repository -y ppa:ubuntu-toolchain-r/test
RUN apt install g++



COPY package*.json ./
# RUN npm install
RUN npm ci --only=production

##################

COPY . ./

EXPOSE 3000

CMD ["node","index.js"]

