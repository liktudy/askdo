# Build

This directory is reserved for build helpers that generate or update kits.

The build layer must follow:

- reuse existing kits before building new kits
- write only necessary kit source files
- keep generated kits small and executable
- preserve user-owned kit assets
