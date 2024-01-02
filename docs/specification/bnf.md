# BNF Notation
[Backus Naur Form](https://www.geeksforgeeks.org/bnf-notation-in-compiler-design/) notation of the scopie
parsing rules.
Note that just passing BNF is not enough to be a valid scope as there are edge cases not specified.
One such example is that super wildcards must be the last block.

```bnf
<scopes> ::= <scope> (<scope_sep> <scope>)+ | <scope>
<rules> ::= <rule> (<scope_sep> <rule>)+ | <rule>

<rule> ::= <any_permission> (<block_sep> <scope>)+
<scope> ::= <block> (<block_sep> <block>)+ | <block>

<block> ::= <literals> | <array_block> | <var_block> | <wildcard> | <super_wildcard>
<array_block> ::= <literals> (<array_sep> <literals>)+
<var_block> ::= <var_prefix> <literals>

<any_permission> ::= <allow_permission> | <deny_permission>

<block_sep> ::= "/"
<scope_sep> ::= ","
<array_sep> ::= "|"
<var_prefix> ::= "@"
<wildcard> ::= "*"
<super_wildcard> ::= "**"
<allow_permission> ::= "allow"
<deny_permission> ::= "deny"
<literals> ::= ([A-Z] | [a-z] | [0-9] | "_" | "-")+
```
