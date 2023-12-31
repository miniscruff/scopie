# BNF Notation
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
<literals> ::= ([A-Z] | [a-z] | "_" | "-")+
```
