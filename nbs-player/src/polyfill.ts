import 'event-target-polyfill';
import { TextDecoder, TextEncoder } from 'text-encoding';

globalThis.TextDecoder = TextDecoder;
globalThis.TextEncoder = TextEncoder;
