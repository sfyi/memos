package util

import "regexp"

var (
	UIDMatcher = regexp.MustCompile("^[a-zA-Z0-9]([a-zA-Z0-9-_]{0,}[a-zA-Z0-9])?$")
)
