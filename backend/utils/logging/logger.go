package logging

import (
	"context"
	"github.com/sirupsen/logrus"
)

type Logger interface {
	Debug(args ...interface{})
	Info(args ...interface{})
	Error(args ...interface{})
	Fatal(args ...interface{})

	Debugf(format string, args ...interface{})
	Infof(format string, args ...interface{})
	Errorf(format string, args ...interface{})
	Fatalf(format string, args ...interface{})
}

type logger struct {
	stdEntry *logrus.Entry
}

func (l *logger) Debug(args ...interface{}) {
	l.stdEntry.Debug(args...)
}

func (l *logger) Info(args ...interface{}) {
	l.stdEntry.Info(args...)
}

func (l *logger) Error(args ...interface{}) {
	l.stdEntry.Error(args...)
}

func (l *logger) Fatal(args ...interface{}) {
	l.stdEntry.Error(args...)
}

func (l *logger) Debugf(format string, args ...interface{}) {
	l.stdEntry.Debugf(format, args...)
}

func (l *logger) Infof(format string, args ...interface{}) {
	l.stdEntry.Infof(format, args...)
}

func (l *logger) Errorf(format string, args ...interface{}) {
	l.stdEntry.Errorf(format, args...)
}

func (l *logger) Fatalf(format string, args ...interface{}) {
	l.stdEntry.Fatalf(format, args...)
}

func NewLogger() *logger {
	ctx := context.TODO()
	return &logger{stdEntry: logrus.StandardLogger().WithContext(ctx)}
}
