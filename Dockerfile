FROM alpine:3.17.3
RUN apk add --no-cache ca-certificates && \
    adduser -D -u 12345 -g 12345 basic-devtools
COPY ./backend/bin/devtools /home/basic-devtools/devtools
COPY ./frontend/build/ /home/basic-devtools/build/

USER 12345
WORKDIR /home/basic-devtools
ENTRYPOINT ["/home/basic-devtools/devtools"]