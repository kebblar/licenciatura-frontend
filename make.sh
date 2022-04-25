echo "Borrando directorios viejos..."
rm -rf ./dist
rm -rf ./lib

echo "Creando archivo binario..."
npm run build

echo "Preparando creacion del archivo jar..."
mkdir -p ./lib/src/main/resources
cp -r ./dist ./lib/src/main/resources/static
cp pom.xml ./lib
