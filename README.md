# To deploy

```
bundle exec rake publish BRANCH_NAME=master
```

# For M1 devices

Change the version number below

```
gem install --install-dir ./vendor/bundle/ruby/x.x.x/gems ffi -v 1.14 -- --enable-libffi-alloc
```

