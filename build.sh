ng build
npx cap sync android
sed -i "/<base /d" "./android/app/src/main/assets/public/index.html"
cd android
./gradlew clean assembleDebug
cd ..
rm -rf dist
mkdir dist
cp ./android/app/build/outputs/apk/debug/app-debug.apk dist
chmod 777 -R dist
