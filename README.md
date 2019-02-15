# The Tool for Tabulating Thirty Top Tooters (t5)
This web app, which is live at <https://t5.codesections.com>, reads the toots
that a particular [Mastodon](https://joinmastodon.org) user has favorited.  It
then calculates which other Mastodon users were favorited the most—creating a 
list of the user's favorite 30 users.

Why would anyone want this?  For fun, mostly.  I put it together when I wasn't
sure who to "feature" on my profile.  I decided I wanted a scientific approach
to seeing whose toots I'd liked the most, and this tool was born.

## Goals
This software is intentionally minimalist.  Before making API calls, it is under
14KB, uses no external libraries, and has no dependencies.  It does only one thing;
hopefully, it does that well.

## Note on API calls
Due to the nature of the Mastodon API, this app makes a fairly high number of API 
calls.  It should not be excessive, but please keep in mind that your instance 
likely pays for bandwidth—don't sit there refreshing this app needlessly.  Just 
check your favorite users and move on.

## Contributing
I don't anticipate adding a tremendous amount to this application, but if you 
notice any bugs or have any feature requests, please feel free to open an issue.

More broadly, I'd love to hear your thoughts and feedback on the app.  You can
send me an email at <daniel@codesections.com> or reach me on Mastodon, where 
my handle is [@codesections@fosstodon.org](https://fosstodon.org/@codesections).
