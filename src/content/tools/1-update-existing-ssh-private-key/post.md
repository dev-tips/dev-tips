Title: Update existing SSH private key

-----

Date: 1579560832

-----

Description: If your private key is still in an old or unsecure format (e.g. without a passphrase), you can update it using the following command.

-----

Authors: rasshofer

-----

Text:

```sh
ssh-keygen -p -f ~/.ssh/id_rsa
```

It will prompt for your old (if any exists) and your new passphrase. It will also prompt for the keyfile path (with suggestion) if you do not provide the `-f` key-file option at all. (`~/.ssh/id_rsa` is just an example. Could be `id_dsa` or any other filename as well.)

After adding a passphrase for your existing key, you can use `ssh-add` so that you only need to enter your password once for a session.

```sh
ssh-add ~/.ssh/id_rsa
```
