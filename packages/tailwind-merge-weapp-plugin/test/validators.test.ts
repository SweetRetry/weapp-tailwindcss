import { expect, it } from 'vitest'

import { validators } from './utils'

const {
  isLength,
  isPercent,
  isArbitraryLength,
  isInteger,
  isArbitraryValue,
  isAny,
  isTshirtSize,
  isArbitrarySize,
  isArbitraryPosition,
  isArbitraryImage,
  isArbitraryNumber,
  isArbitraryShadow,
} = validators

it('isLength', () => {
  expect(isLength('1')).toBe(true)
  expect(isLength('1023713')).toBe(true)
  expect(isLength('1.5')).toBe(true)
  expect(isLength('1231.503761')).toBe(true)
  expect(isLength('px')).toBe(true)
  expect(isLength('full')).toBe(true)
  expect(isLength('screen')).toBe(true)
  expect(isLength('1/2')).toBe(true)
  expect(isLength('123/345')).toBe(true)

  expect(isLength('[3.7%]')).toBe(false)
  expect(isLength('[481px]')).toBe(false)
  expect(isLength('[19.1rem]')).toBe(false)
  expect(isLength('[50vw]')).toBe(false)
  expect(isLength('[56vh]')).toBe(false)
  expect(isLength('[length:var(--arbitrary)]')).toBe(false)
  expect(isLength('1d5')).toBe(false)
  expect(isLength('[1]')).toBe(false)
  expect(isLength('[12px')).toBe(false)
  expect(isLength('12px]')).toBe(false)
  expect(isLength('one')).toBe(false)
})

it('isArbitraryLength', () => {
  expect(isArbitraryLength('[3.7%]')).toBe(true)
  expect(isArbitraryLength('[481px]')).toBe(true)
  expect(isArbitraryLength('[19.1rem]')).toBe(true)
  expect(isArbitraryLength('[50vw]')).toBe(true)
  expect(isArbitraryLength('[56vh]')).toBe(true)
  expect(isArbitraryLength('[length:var(--arbitrary)]')).toBe(true)

  expect(isArbitraryLength('1')).toBe(false)
  expect(isArbitraryLength('3px')).toBe(false)
  expect(isArbitraryLength('1d5')).toBe(false)
  expect(isArbitraryLength('[1]')).toBe(false)
  expect(isArbitraryLength('[12px')).toBe(false)
  expect(isArbitraryLength('12px]')).toBe(false)
  expect(isArbitraryLength('one')).toBe(false)
})

it('isInteger', () => {
  expect(isInteger('1')).toBe(true)
  expect(isInteger('123')).toBe(true)
  expect(isInteger('8312')).toBe(true)

  expect(isInteger('[8312]')).toBe(false)
  expect(isInteger('[2]')).toBe(false)
  expect(isInteger('[8312px]')).toBe(false)
  expect(isInteger('[8312%]')).toBe(false)
  expect(isInteger('[8312rem]')).toBe(false)
  expect(isInteger('8312.2')).toBe(false)
  expect(isInteger('1.2')).toBe(false)
  expect(isInteger('one')).toBe(false)
  expect(isInteger('1/2')).toBe(false)
  expect(isInteger('1%')).toBe(false)
  expect(isInteger('1px')).toBe(false)
})

it('isArbitraryValue', () => {
  expect(isArbitraryValue('[1]')).toBe(true)
  expect(isArbitraryValue('[bla]')).toBe(true)
  expect(isArbitraryValue('[not-an-arbitrary-value?]')).toBe(true)
  expect(isArbitraryValue('[auto,auto,minmax(0,1fr),calc(100vw-50%)]')).toBe(true)

  expect(isArbitraryValue('[]')).toBe(false)
  expect(isArbitraryValue('[1')).toBe(false)
  expect(isArbitraryValue('1]')).toBe(false)
  expect(isArbitraryValue('1')).toBe(false)
  expect(isArbitraryValue('one')).toBe(false)
  expect(isArbitraryValue('o[n]e')).toBe(false)
})

it('isAny', () => {
  expect(isAny()).toBe(true)
  // @ts-expect-error
  expect(isAny('')).toBe(true)
  // @ts-expect-error
  expect(isAny('something')).toBe(true)
})

it('isTshirtSize', () => {
  expect(isTshirtSize('xs')).toBe(true)
  expect(isTshirtSize('sm')).toBe(true)
  expect(isTshirtSize('md')).toBe(true)
  expect(isTshirtSize('lg')).toBe(true)
  expect(isTshirtSize('xl')).toBe(true)
  expect(isTshirtSize('2xl')).toBe(true)
  expect(isTshirtSize('2.5xl')).toBe(true)
  expect(isTshirtSize('10xl')).toBe(true)
  expect(isTshirtSize('2xs')).toBe(true)
  expect(isTshirtSize('2lg')).toBe(true)

  expect(isTshirtSize('')).toBe(false)
  expect(isTshirtSize('hello')).toBe(false)
  expect(isTshirtSize('1')).toBe(false)
  expect(isTshirtSize('xl3')).toBe(false)
  expect(isTshirtSize('2xl3')).toBe(false)
  expect(isTshirtSize('-xl')).toBe(false)
  expect(isTshirtSize('[sm]')).toBe(false)
})

it('isArbitrarySize', () => {
  expect(isArbitrarySize('[size:2px]')).toBe(true)
  expect(isArbitrarySize('[size:bla]')).toBe(true)
  expect(isArbitrarySize('[length:bla]')).toBe(true)
  expect(isArbitrarySize('[percentage:bla]')).toBe(true)

  expect(isArbitrarySize('[2px]')).toBe(false)
  expect(isArbitrarySize('[bla]')).toBe(false)
  expect(isArbitrarySize('size:2px')).toBe(false)
})

it('isArbitraryPosition', () => {
  expect(isArbitraryPosition('[position:2px]')).toBe(true)
  expect(isArbitraryPosition('[position:bla]')).toBe(true)

  expect(isArbitraryPosition('[2px]')).toBe(false)
  expect(isArbitraryPosition('[bla]')).toBe(false)
  expect(isArbitraryPosition('position:2px')).toBe(false)
})

it('isArbitraryImage', () => {
  expect(isArbitraryImage('[url:var(--my-url)]')).toBe(true)
  expect(isArbitraryImage('[url(something)]')).toBe(true)
  expect(isArbitraryImage('[url:bla]')).toBe(true)
  expect(isArbitraryImage('[image:bla]')).toBe(true)
  expect(isArbitraryImage('[linear-gradient(something)]')).toBe(true)
  expect(isArbitraryImage('[repeating-conic-gradient(something)]')).toBe(true)

  expect(isArbitraryImage('[var(--my-url)]')).toBe(false)
  expect(isArbitraryImage('[bla]')).toBe(false)
  expect(isArbitraryImage('url:2px')).toBe(false)
  expect(isArbitraryImage('url(2px)')).toBe(false)
})

it('isArbitraryNumber', () => {
  expect(isArbitraryNumber('[number:black]')).toBe(true)
  expect(isArbitraryNumber('[number:bla]')).toBe(true)
  expect(isArbitraryNumber('[number:230]')).toBe(true)
  expect(isArbitraryNumber('[450]')).toBe(true)

  expect(isArbitraryNumber('[2px]')).toBe(false)
  expect(isArbitraryNumber('[bla]')).toBe(false)
  expect(isArbitraryNumber('[black]')).toBe(false)
  expect(isArbitraryNumber('black')).toBe(false)
  expect(isArbitraryNumber('450')).toBe(false)
})

it('isArbitraryShadow', () => {
  expect(isArbitraryShadow('[0_35px_60px_-15px_rgba(0,0,0,0.3)]')).toBe(true)
  expect(isArbitraryShadow('[inset_0_1px_0,inset_0_-1px_0]')).toBe(true)
  expect(isArbitraryShadow('[0_0_#00f]')).toBe(true)
  expect(isArbitraryShadow('[.5rem_0_rgba(5,5,5,5)]')).toBe(true)
  expect(isArbitraryShadow('[-.5rem_0_#123456]')).toBe(true)
  expect(isArbitraryShadow('[0.5rem_-0_#123456]')).toBe(true)
  expect(isArbitraryShadow('[0.5rem_-0.005vh_#123456]')).toBe(true)
  expect(isArbitraryShadow('[0.5rem_-0.005vh]')).toBe(true)

  expect(isArbitraryShadow('[rgba(5,5,5,5)]')).toBe(false)
  expect(isArbitraryShadow('[#00f]')).toBe(false)
  expect(isArbitraryShadow('[something-else]')).toBe(false)
})

it('isPercent', () => {
  expect(isPercent('1%')).toBe(true)
  expect(isPercent('100.001%')).toBe(true)
  expect(isPercent('.01%')).toBe(true)
  expect(isPercent('0%')).toBe(true)

  expect(isPercent('0')).toBe(false)
  expect(isPercent('one%')).toBe(false)
})
