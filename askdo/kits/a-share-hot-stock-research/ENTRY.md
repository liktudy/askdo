# A-Share Hot Stock Research Entry

## Use This Kit

```text
use askdo kit a-share-hot-stock-research: analyze current hot A-share stocks by recent market heat and trading activity, produce an information report, and provide non-personalized trading suggestions.
```

## Purpose

This kit analyzes current A-share market heat and trading activity, verifies public stock information, and returns a structured research report with short-to-medium-term non-personalized buy, sell, hold, watch, or avoid suggestions.

## Run Gate

This kit can run only when:

- `kit.json` status is `active`.
- `build_approval.status` is `approved`.
- the ask is limited to A-share public market research.
- the user confirms the time horizon and risk frame.
- current market data and company information can be verified through public sources.
- no personalized portfolio, suitability, leverage, guaranteed-return, or account-specific instruction is requested.

## Inputs

- Market: A-share market.
- Heat definition: recent market heat and trading activity.
- Time horizon: short-to-medium term, approximately 1 to 4 weeks unless revised by the user.
- Risk frame: medium risk, no leverage, no full-position or single-stock heavy-position recommendation.
- Output: information report with tracking indicators and non-personalized trading suggestions.

## Outputs

- Hot stock shortlist.
- Per-stock company and market information.
- Recent catalyst and trading activity summary.
- Risk and uncertainty notes.
- Non-personalized action suggestion: `watch`, `buy_on_pullback`, `hold`, `take_profit_or_reduce`, or `avoid`.
- Follow-up tracking indicators.

## When To Refuse Or Revise

- Refuse execution when the user asks for guaranteed profit, insider information, illegal manipulation, or personalized account-specific advice.
- Request a revised planning frame when the time horizon, risk frame, or output purpose is unclear.
- Request approval when the report would expand into high-risk execution, portfolio allocation, leverage, or automated trading.
- Revise the kit when the flow, roles, or roster do not fit the requested market research scenario.

## Decision Request

This newly generated kit is pending approval. Choose one:

- `approve_and_run`
- `revise_kit`
- `reject`

Askdo must wait for the user decision before executing this kit.
