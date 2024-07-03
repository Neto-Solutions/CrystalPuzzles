# if GIT_DIR=/path/to/repo/.git git rev-parse $1 >/dev/null 2>&1
if git rev-parse $1 >/dev/null 2>&1
then
    echo "Found tag"
else
    echo "Tag not found"
fi


VERSION=`git describe --abbrev=0 --tags`

echo $VERSION


#replace . with space so can split into an array
VERSION_BITS=(${VERSION//./ })

#get number parts and increase last one by 1
VNUM1=${VERSION_BITS[0]}
VNUM2=${VERSION_BITS[1]}
VNUM3=${VERSION_BITS[2]}
VNUM1=`echo $VNUM1 | sed 's/v//'`

echo "The minor part of tag is $VNUM3"

VNUM3=$((VNUM3+1))

#create new tag
NEW_TAG="v$VNUM1.$VNUM2.$VNUM3"

#create new tag
NEW_TAG="$V$VNUM1.$VNUM2.$VNUM3"

if [ $NEW_TAG = "..1" ]; then
    NEW_TAG="v0.0.1"
fi

echo "Updating $VERSION to $NEW_TAG"

#get current hash and see if it already has a tag
GIT_COMMIT=`git rev-parse HEAD`
NEEDS_TAG=`git describe --contains $GIT_COMMIT 2>/dev/null`

#only tag if no tag already (would be better if the git describe command above could have a silent option)
if [ -z "$NEEDS_TAG" ]; then
    echo "Tagged with $NEW_TAG (Ignoring fatal:cannot describe - this means commit is untagged) "
    git tag $NEW_TAG
    git push --tags
else
    echo "Already a tag on this commit"
fi