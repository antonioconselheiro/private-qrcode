rm -rf dist docs ./PrivateQRCode/www
mkdir -p PrivateQRCode/www
ng build
cp -r ./docs/** ./PrivateQRCode/www
sed -i "/<base /d" "./PrivateQRCode/www/index.html"
cd ./PrivateQRCode
cordova build android
cd ..
mkdir dist
cp ./PrivateQRCode/platforms/android/app/build/outputs/apk/debug/app-debug.apk dist
chmod 777 -R dist
