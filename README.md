#git OST feat. LA Hacks OST by LA Hacks

Any respectable programmer knows the feeling of ecstasy and joy that comes with commiting changes to a repository. Sometimes, those changes are so epic in size that they demand legendary background music. Introducing the _git OST feat. LA Hacks OST by LA Hacks_.

##How it works

__git OST__ will run in the background and watch your git repositories for changes. It polls to determine the size of your code base, and everytime you add files to your staging area, it compares the magnitude of your staged changes to your entire code base. If the ratio of your changes to the size of your code base exceeds the threshold, the LAHacks OST will start playing (and you will receive a notification) indicating that it is time to commit.

_Stage your changes. When your staged changes reach a level worthy of the LA Hacks OST, it will grace you with it's soothing music_.

##Install

Are you running OS X? Then you can cry tears of joy because you get full support right out of the box!

Install the terminal-notifier gem for Notification Center Notifications:

`[sudo] gem install terminal-notifier`
Alternatively:
`brew install terminal-notifier`

Download/clone this repo and run:

`node watch.js`

If you're on Linux, you're going to have change some config settings to experience the brilliance that is git OST. Open gitost.js with the editor of your choice.

    var target = {
        process : 'open lahacksOST.mp3',
        config : {}
    };

Change `target.process` to reflect the process you want to invoke when the threshold is reached. `open lahacksOST.mp3` is specific to OS X systems.

If you're on Windows, yeah no.

##Configuration

###Adding Directories to watch

Simply add the directories you wish to watch to an environment variable called `$GIT_OST`. It should be in a format similar to you `$PATH` variable.

`export GIT_OST=/dir1:/dir2/subdir:/dir3`

Make sure that git repositories are initialized in each directory added to `$GIT_OST`

###Changing the threshold and target process

    var target = {
        process : 'open lahacksOST.mp3',
        config : {}
    };
    var diffThreshold = 0.3;

In the extremely rare case that you don't want the LAHacks OST to play when the threshold is reached, go ahead and change `target.process`. `diffThreshold` can be adjusted as well to set the threshold level required to trigger the process.

##Background

![LA Hacks had THE BEST soundtrack OF ALL TIME](http://i.imgur.com/hYTxkiq.jpg)

[LA Hacks](http://lahacks.com) had THE best soundtrack in hackathon history. No, [LA Hacks](http://lahacks.com) had THE BEST soundtrack OF ALL TIME. Hackers everywhere were inspired to keep shipping code because of it. Thousands of commits were made with the LA Hacks OST playing in the background. #STACKEDDD. It only seemed natural to have it be the soundtrack behind git OST.
