---
layout: post
title:  "Trading Bitcoin, Litecoin, and Ether on Coinbase"
date:   2017-12-17 19:09:54 -0701
category: cryptocurrency
tags: bitcoin litecoin ethereum crypto
comments: true
published: true
---

Since Bitcoin first started gaining traction in 2011, we've seen a boom in the development and interest in cryptocurrencies and blockchain technology. Many other cryptocurrencies were developed after Bitcoin, and several of them even became popular and are doing well. Cryptocurrencies are traded on sites known as "exchanges," which transact various cryptocurrencies for fiat currency. Coinbase is one of the most popular and trusted exchanges. Coinbase is a San Francisco company which was founded in 2012, has gone through several successful rounds of funding, and has even been backed by some on Wall Street.

Coinbase is recommended to cryptocurrency beginners due to its ease of use and wide accessibility. In this guide, I'll show you how to register, secure, and use your Coinbase account to trade [Bitcoin](https://en.wikipedia.org/wiki/Bitcoin), [Litecoin](https://en.wikipedia.org/wiki/Litecoin), and [Ether](https://en.wikipedia.org/wiki/Ethereum). This guide is primarily oriented toward users in the US, although the process is conceptually similar for other localities which Coinbase supports. Please see Coinbase's support section in the references below to find particular information about using your local currency with Coinbase.

> Note: be wise and choose carefully when investing into an asset as volatile as cryptocurrency. Like trading stock, there is an inherent risk in buying and selling cryptocurrencies, however the deviations can be much greater with crypto coins. Never invest more than you are willing and able to lose.

{% include toc.markdown %}

## Registering for an Account
Before you can conduct any trades on the exchange, you need to {% include affiliate-link.html url="https://www.coinbase.com/join/5374eaf1b2fe88e352000054" text="register for Coinbase." %} You'll need to provide your full name, email, a *good* passphrase, and your state, then complete the CAPTCHA and agree to their terms. It's free to have an account, but you pay transaction fees.

After you login to your Coinbase account, you'll be presented with the dashboard. This view quickly shows you the charts for the three supported cryptocurrencies, the distribution of your funds on Coinbase, and your recent transaction history.

{% image coinbase/dashboard_charts.jpg %}

## Configuring 2 Factor Authentication (2FA)
Before doing anything with your Coinbase account, you'll want to lock it down with two factor authentication. This can be configured in the form of SMS messages or using TOTP codes with an app like Google Authenticator. I highly recommend the latter, as it is a much stronger assurance of security over the former.

To configure 2FA, navigate to the "Security" pane of the "Settings" tab. Here you can select the button to enable 2 factor auth with Authenticator . You'll need to scan the QR code with your authenticator app to save the seed, then enter a test verification code to finish registering it.

You can also enable 2 factor auth on any sends, which will greatly reduce the chances of an attacker being able to transfer funds from your wallets.

## Performing Deposits and Withdrawals
One method of making deposits into your Coinbase account is through the use of credit/debit cards. Select the "Payment Method" dropdown on the "Buy/Sell" tab, and choose "Add New Account," before selecting "Credit/Debit Card." You'll need to enter your card details, then go through two small verification charges. You'll enter the values of the amounts charged to verify your card.

<img src="{% asset_path coinbase/add_account.jpg %}" class="pull-right half-size spaced" alt="Adding a New Account" />

Note that for each of these methods, you'll be requested to complete ID verification with Coinbase. You can feel just as safe doing this with Coinbase as with other financial providers, as they are [regulated](https://support.coinbase.com/customer/en/portal/articles/2689172-is-coinbase-regulated-) and operate under the same laws as a US financial company and have thus far proven a strong security model.

You can also link your bank account to perform deposits. This can be done by either logging in to your online banking provider, or through a deposit verification into your account. The deposit verification works similarly to the verification for credit/debit cards described above.

If you don't want to link your bank account, you can also request a wire transfer. Select your USD wallet on the Accounts tab, then hit "Deposit." Select "Wire Transfer" as your payment method and supply the transfer details from your bank.

For withdrawals, you can request a wire transfer back to your bank account. Add a new payment method and select "Add Wire Withdrawal Information," then follow the forms with the information from your bank to register.

You can also connect a PayPal account to perform withdrawals. Make sure you've verified your ID with Coinbase in order to enable PayPal as a payment method. Then, select "Add Payment Method" and choose PayPal, before logging in and verifying your PayPal account.

## Buying and Selling Bitcoin, Litecoin, and Ether

<img src="{% asset_path coinbase/buy_ethereum.jpg %}" class="pull-right half-size spaced" alt="Purchasing Ethereum" />

Once you have your USD wallet set up, and a payment method registered or have already received some coins, you'll be ready to purchase some cryptocurrency. First, navigate to the "Buy/Sell" tab. When you first reach the page, Buy will already be selected as your action. You can select the currency you'd like to purchase, your payment method, and finally the amount to purchase. You can specify this amount in either USD or the cryptocurrency you've selected. There are also controls for repeating this purchase. Once you've configured the form, hit the button to buy the coin. You'll then verify the transaction details look sane, before confirming the purchase.

Congratulations, you've just purchased your first cryptocurrency!

<img src="{% asset_path coinbase/sell_litecoin.jpg %}" class="pull-right half-size spaced" alt="Selling Litecoin" />

Now let's say that after some time, the price of that cryptocurrency increases. You'd like to sell some of your coin and invest in another cryptocurrency. To do so, select "Sell" on the "Buy/Sell" tab. Here you can select the wallet to sell from, where you want to deposit, and the amount to sell. Just like the Buy action, you can configure to repeat this sell order. Hit the button to sell your cryptocurrency, then verify the transaction details and confirm the sell.

Note that transactions will take some time to settle on the various networks, requiring multiple transaction confirmations to be completed. For large transactions, you'll want to wait until it is fully confirmed before taking action, such as selling an expensive item like a car. At the time of writing, transactions take quite some time (20min+) to settle on the Bitcoin network due to the high activity.

## Managing Wallet Addresses
Normally Coinbase will generate new addresses automatically as you make transactions. This avoids providing a complete list of your transaction history on a single address. If you do want to reuse or manually add new addresses to your various wallets, you can do that too!

To manage all of your different wallet addresses, navigate to the "Addresses" pane in the "Tools" tab. Here you can find a dropdown list of each of your different wallets, along with their current value. Select an account to view the addresses associated with that wallet. Once you've selected the wallet you want to add a new address to, simply hit the "Create New Address" button to the right of the dropdown and filter. To the right of each address entry, you can find a "Details" button, which takes you to the address page to set a label or view a QR code and send/receive from this address.

## Creating a Vault Account

<img src="{% asset_path coinbase/create_vault.jpg %}" class="pull-right half-size spaced" alt="Creating a New Vault Account" />

For a bit tighter security than your regular hot wallets, you can opt to store larger amounts of your funds in a Vault Account. Vault accounts enforce a 48 hour waiting period before funds can be transferred from the vault account, as well as verification from two email addresses. This would give you the necessary time to take action in the event your account was compromised and an attacker attempted to drain your vault. Vault accounts support holding Bitcoin, Litecoin, and Ether.

<img src="{% asset_path coinbase/name_vault.jpg %}" class="pull-right half-size spaced" alt="Naming a Vault" />

To configure your vault account, navigate to the "Accounts" tab, then scroll to the bottom of your account list. Select "Vault" and click the "Create Vault" button. Next, select the type of currency you'd like to use for this vault. You'll be prompted for a name for the vault, and whether withdrawals will be approved individually or by a group co-signing. Next, you'll be prompted to add a secondary email address in order to receive two separate withdrawal verification links. This will raise the bar for attackers who want to transfer funds from your vault accounts, requiring compromise of two separate email accounts. Repeat this process twice more for the other two types of currency.

For even stronger security measures, you should consider using a hardware wallet like a Trezor. This device supports Bitcoin, Litecoin, and Ether, plus a handful of other coins, and is safe to use even on untrusted systems thanks to its design. For the highest security, a "paper wallet" can be used as cold storage. This is an export of your key, usually printed as a QR code. You could alternatively store your 12 to 24 word seed phrase which generates your keys. Store this paper wallet in a safe place, like a safety deposit box or a safe.

## Conclusion
If you haven't already done so, make sure you {% include affiliate-link.html url="https://www.coinbase.com/join/5374eaf1b2fe88e352000054" text="register for Coinbase!" %} This exchange is easy to use, offers the three major crypto coins, and is a licensed and regulated US exchange. This is a great platform to start exploring cryptocurrency. As you've seen, it's easy to add payment methods, buy and sell various cryptocurrencies, and manage multiple addresses for each of your wallets.

What's next? Once you've made a few transactions, you'll be prepared to start organizing your crypto portfolio. It's best to keep track of the performance of your holdings so you can make data-driven decisions when optimizing how you balance your assets. It is also wise to spread your portfolio value over multiple assets and storage media to manage risk to your investments.

I hope you've enjoyed getting started on this exchange! Have any tips on working with Coinbase? Leave a comment below about your experiences! Don't forget to subscribe to the newsletter below to be notified when more useful articles like this are published.

## Additional References
* [Coinbase Support Knowledgebase](https://support.coinbase.com/)
* [Coinbase on Wikipedia](https://en.wikipedia.org/wiki/Coinbase)
