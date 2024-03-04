FROM node:20

RUN npm install husky eslint typescript @angular/cli sass-lint cordova -g

WORKDIR /private-qrcode

COPY ./.gitconfig /root/.gitconfig
COPY ./.ssh /root/.ssh
RUN chmod 600 -R /root/.ssh
RUN ssh-add -D && ssh-add /root/.ssh/id_ed25519 || true

ENV LANG C.UTF-8
ENV TZ America/Sao_Paulo

EXPOSE 9229
EXPOSE 4200

# The run the start script
CMD [ "/bin/bash" ]
