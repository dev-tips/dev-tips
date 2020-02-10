Title: Reverse Engineering of Android apps

-----

Date: 1446754300

-----

Description: A very basic introduction to reverse engineering (in general and for Android) as well as some useful tools (apktool, dex2jar, jd-cmd)

-----

Authors: rasshofer

-----

Text:

While reverse engineering of software is often prohibited by respective end user license agreements, these terms are generally invalid in many countries due to the fact that users have the right to analyze purchased applications for security audits or troubleshooting by law.

The information and tools provided in this post and the appropriate repository are NOT intended for piracy and other non-legal uses. Use on your own risk.

## Installation / Usage / TL;DR

The provided `Dockerfile` within the repository (github: rasshofer/android-reverse-engineering) contains everything you need. Just build the image and run your commands within containers based on that image.

### Build

You may want to replace `rasshofer` and `android-reverse-engineering` with your own namespaces and names.

```bash
docker build -t rasshofer/android-reverse-engineering .
```

### Run

Again, you may want to replace `rasshofer` and `android-reverse-engineering` with your own namespaces and names.

```bash
docker run --rm -v "$PWD/data:/data" rasshofer/android-reverse-engineering {COMMAND}
```

The container’s workdir is `/data`. `/tools` contains all the required tools.

- Running apktool → `/tools/apktool/apktool`
- Running dex2jar → `/tools/dex-tools/d2j-dex2jar.sh`
- Running jd-cmd → `/tools/jd-cmd/jd-cli`

### Examples

The following bash script example applies all of the steps described below using Facebook’s Android app (»Katana«).

```bash
IMAGE_NAME="rasshofer/android-reverse-engineering"

DATA="/data"
FILE="$DATA/com.facebook.katana.apk"

ID=$(date +"%m-%d-%Y-%H-%M-%S")
OUTPUT="$DATA/fb_$ID"
UNZIP_FOLDER="$OUTPUT/unzipped"
APKTOOL_FOLDER="$OUTPUT/apktool"
D2J_FILE="$OUTPUT/dex2jar.jar"
JD_FOLDER="$OUTPUT/jd"

mkdir "data/fb_$ID"

echo "Unzipping..."

docker run --rm -v "$PWD/data:/data" $IMAGE_NAME unzip -q "$FILE" -d "$UNZIP_FOLDER"

echo "Running apktool..."

docker run --rm -v "$PWD/data:/data" $IMAGE_NAME /tools/apktool/apktool d "$FILE" -o "$APKTOOL_FOLDER"

echo "Running dex2jar..."

docker run --rm -v "$PWD/data:/data" $IMAGE_NAME /tools/dex-tools/d2j-dex2jar.sh "$UNZIP_FOLDER/classes.dex" -o "$D2J_FILE"

echo "Running jd-cmd..."

docker run --rm -v "$PWD/data:/data" $IMAGE_NAME /tools/jd-cmd/jd-cli -od "$JD_FOLDER" "$D2J_FILE"
```

## »Reverse engineering«

While »forward engineering« describes the classical path starting with the planning and finishing with the implementation of an application, »reverse engineering« describes the logical backward analysis of a finished product based on its binary code while not being aware of technical details (e.g. the internal structure of components as well as the relations amongst those) at all.

In doing so, reverse engineers try to get as much information about the product as possible and to present this in an abstract, easily understandable way (e.g. retranslation into high-level source code).

## Usage scenarios

- Detection of security flaws
- Troubleshooting of compatibility issues
- Checking code on trustworthiness of information (services, assets, API keys, ...)
- Copycats (but also vice versa: discovery of code theft)
- Software piracy

## Reverse engineering of Java/Android

Java code in general is partially compiled first (bytecode) and interpreted (within the Java VM) afterwards. Android application packages (»APK«) are obtainable in a simple manner and code obfuscation isn’t applied by default. Thus the conversion of APK to JAR is usually no problem at all. This makes Java/Android very suitable for reverse engineering.

## APK structure

An APK (»Android application package«) is nothing but a ZIP archive at first glance, containing the Android Manifest (`AndroidManifest.xml` → Binary XML), all classes in »Dalvik Executable« format (`classes.dex`), and compiled resources (`resources.arsc`) as well as uncompiled resources (`res` directory). Android’s virtual execution environment »Dalvik virtual machine« doesn’t process conventional Java binaries (`.class` files) but its own bytecode format, the »Dalvik Executable Format« (`.dex`). The conversion of `.class` to `.dex` happens during development via »dx«, which is part of the Android development environment (SDK). The unpacked file `classes.dex` therefore contains the definitions of all classes as bytecode.

## Obtaining APKs

1. Obtain from device (via USB and »[Android Debug Bridge](http://developer.android.com/tools/help/adb.html)«, rooting may be necessary)
2. Back up to SD card (e.g. using [APKOptic](https://play.google.com/store/apps/details?id=com.mlst.appmanager), [Astro File Manager](https://play.google.com/store/apps/details?id=com.metago.astro))
3. Use »[Google Play Unofficial Python API](https://github.com/egirault/googleplay-api)«
4. Web services (e.g. [APK Downloader](http://apps.evozi.com/apk-downloader/))
5. Data transfer sniffing (e.g. using [Wireshark](http://www.wireshark.org/))
6. »Alternative« sources (e.g. Google search for »[flappy bird apk](https://www.google.com/search?q=flappy+bird+apk)«)

## Tools

- [apktool](http://ibotpeaches.github.io/Apktool/)
- [dex2jar](https://github.com/pxb1988/dex2jar)
- [jd-cmd](https://github.com/kwart/jd-cmd)
- ([JD-GUI](http://jd.benow.ca/))

## Decompilation

While there’s no tool to decompile APKs into `.java` files 100% reliably, there are two ways that allow decompiling classes and resources as accurate as possible. However, the focus of decompilation in reverse engineering is on generating human-readable codes rather than a fully-functional code base. A combination of the following two decompilation methods usually delivers the most useful results.

### Decompilation using apktool

apktool is based on »[smali](https://github.com/JesusFreke/smali)« and »[baksmali](https://github.com/JesusFreke/smali)«, an assembler and disassembler for the DEX format, which is used by the Dalvik VM. baksmali disassembles the packed classes from the `classes.dex` file and saves the classes as files in smali syntax (`.smali` files). This is the direct output of the disassembly of the VM-language and also the most reliable way to evaluate what the code is exactly doing. The smali syntax is thus a readable form of Android bytecode.

- Decompilation: `apktool d com.facebook.katana.apk -o facebook`
- Reassmebly: `apktool b com.facebook.katana.apk -o fb-rebuild.apk`

A great advantage of apktool is that not only the pure classes get decompiled, but also several XML resources included in the APK.

### Decompilation using dex2jar and JD-CMD

By using the previously unzipped `classes.dex` and running `d2j-dex2jar.sh classes.dex -o classes.jar`, it’s possible to convert all classes into a Java Archive (`.jar`). The resulting Java archives can be decompiled using the »Java Decompiler«. Unfortunately, JD is only provided as a GUI tool as well as in the form of plug-ins for IDEs right now. »jd-cmd« is a CLI version of the decompiler and can be used to extract the classes.

Nevertheless, »[JD-GUI](http://jd.benow.ca/)« (not included within the repository) is a great way to view the Java source code of individual classes directly in an Eclipse-like interface and export the Java code into a ZIP archive using »Save All Sources« in the menu.

Combined with the resources gained through the apktool, the exported files can be imported into an IDE (e.g. into Eclipse → »Create project from existing source«) and inspected/processed in detail.
