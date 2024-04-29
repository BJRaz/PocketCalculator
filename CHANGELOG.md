# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
- Implement floating point as input (",")
- Implement clear last entered number from buffer ("C")
- Implement changing sign ("+/-")
- Implement more functionalities i.e. "%", "(..)", "MC", "M+", "M-" etc...
- display number size needs to be smaller when big og very small results are shown.
- Source to typescript
- refactoring
- tests

## [known bugs]
- At readystate, enter operand (i.e. 9), then operator (i.e. *), then equals (=), the calculation does not calculate 9*9, but does nothing. Equals handler in operator entered state is not implemented.

## [0.2.0] - 2019-04-10
### Added
- first release

## [0.1.0] - 2019-04-10
### Added
- first release