FROM node:20

RUN npm install husky eslint typescript @angular/cli sass-lint -g

WORKDIR /private-qrcode

COPY ./.gitconfig /root/.gitconfig
COPY ./.ssh /root/.ssh
RUN chmod 600 -R /root/.ssh

ENV LANG C.UTF-8
ENV TZ America/Sao_Paulo

EXPOSE 9229
EXPOSE 4200

# The run the start script
CMD [ "/bin/bash" ]
