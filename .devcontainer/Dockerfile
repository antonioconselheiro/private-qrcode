# Install android
FROM androidsdk/android-31

# Install Git
RUN apt update && apt install -y curl git

# Install Node
## Install nvm with node and npm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

ENV NODE_VERSION 20.11.1

## nvm
RUN echo 'export NVM_DIR="$HOME/.nvm"'                                                >> "$HOME/.bashrc"
RUN echo 'mkdir -p $NVM_DIR'                                                          >> "$HOME/.bashrc"
RUN echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"'                            >> "$HOME/.bashrc"
RUN echo '[ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"'          >> "$HOME/.bashrc"
RUN echo 'nvm install node@v$NODE_VERSION && nvm use node@v$NODE_VERSION'               >> "$HOME/.bashrc"
RUN echo 'npm install husky eslint typescript @angular/cli sass-lint cordova -g'  >> "$HOME/.bashrc"

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
