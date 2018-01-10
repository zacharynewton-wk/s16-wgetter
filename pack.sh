#!/bin/bash

# VARS
OUTFOLDER="public/assets"
BUILDPATH="dist"
MAC="darwin-x64"
WIN32="win32-ia32"
WIN64="win32-x64"
LINUX32="linux-ia32"
LINUX64="linux-x64"
LINUXARM="linux-armv7l"
MACDIR="$BUILDPATH/section_16_wgetter-$MAC"
WIN32DIR="$BUILDPATH/section_16_wgetter-$WIN32"
WIN64DIR="$BUILDPATH/section_16_wgetter-$WIN64"
LINUX32DIR="$BUILDPATH/section_16_wgetter-$LINUX32"
LINUX64DIR="$BUILDPATH/section_16_wgetter-$LINUX64"
LINUXARMDIR="$BUILDPATH/section_16_wgetter-$LINUXARM"
MACPATH="$MACDIR/section_16_wgetter.app/Contents/MacOS/section_16_wgetter"
WIN32PATH="$WIN32DIR/section_16_wgetter.exe"
WIN64PATH="$WIN64DIR/section_16_wgetter.exe"

# Copy Executables
cp "$MACPATH" "$OUTFOLDER/mac"
cp "$WIN32PATH" "$OUTFOLDER/windows"
cp "$WIN64PATH" "$OUTFOLDER/windows"

# Zip Folders
zip -r "$OUTFOLDER/mac/section_16_wgetter-$MAC.zip" "$MACDIR"
zip -r "$OUTFOLDER/windows/section_16_wgetter-$WIN32.zip" "$WIN32DIR"
zip -r "$OUTFOLDER/windows/section_16_wgetter-$WIN64.zip" "$WIN64DIR"
zip -r "$OUTFOLDER/linux/section_16_wgetter-$LINUX32.zip" "$LINUX32DIR"
zip -r "$OUTFOLDER/linux/section_16_wgetter-$LINUX64.zip" "$LINUX64DIR"
zip -r "$OUTFOLDER/linux/section_16_wgetter-$LINUXARM.zip" "$LINUXARMDIR"