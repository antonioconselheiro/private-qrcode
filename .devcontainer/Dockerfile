# Install android
FROM androidsdk/android-30
RUN create avd --name Nexus5X --device "Nexus 5X" --package "system-images;android-30;google_apis;x86_64";

# Install Git
RUN apt update && apt install -y curl git

# Install Node
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt install -y nodejs

# Install global command line tools
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
