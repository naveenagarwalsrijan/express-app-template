FROM 806860399886.dkr.ecr.us-east-1.amazonaws.com/nodejs:10.16.1

RUN mkdir /server

# clean up tmp files (we don't need them for the image)
RUN rm -rf /tmp/* /var/tmp/*

WORKDIR /server
COPY . /server
RUN npm i
RUN npm run build

EXPOSE 80

CMD npm start