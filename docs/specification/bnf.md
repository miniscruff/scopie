---
description: Scopie in BNF syntax
---

# BNF Notation
[Backus Naur Form](https://www.geeksforgeeks.org/bnf-notation-in-compiler-design/) notation of the scopie
parsing rules.
Note that just passing BNF is not enough to be a valid permission as there are edge cases not specified.
One such example is that super wildcards must be the last block.

```bnf
<literals> ::= ([A-Z] | [a-z] | [0-9] | "_" | "-")+
<block_sep> ::= "/"
<array_sep> ::= "|"
<var_prefix> ::= "@"
<wildcard> ::= "*"
<super_wildcard> ::= "**"
<grant_allow> ::= "allow"
<grant_deny> ::= "deny"
<grant_sep> ::= ":"

<grant_any> ::= <grant_allow> | <grant_deny>

<block_literal> ::= <literals>
<block_literal_repeated> ::= <block_literal> (<block_sep> <block_literal>)*
<block_var> ::= <var_prefix> <literals>
<block_array> ::= <literals> (<array_sep> <literals>)+
<block_any> ::= <block_literal> | <block_array> | <block_var> | <wildcard> | <super_wildcard>

<action> ::= <block_any> (<block_sep> <block_any>)*
<permission> ::= <grant_any> <grant_sep> (<block_literal_repeated>)+
```
