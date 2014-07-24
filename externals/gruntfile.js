module.exports = function(grunt) {

    grunt.initConfig({
        karma: {
            options: {
                browsers: ['PhantomJS'],
                frameworks: ['jasmine'],
                singleRun: true
            },
            noteclock: {
                options: {
                    files: ['js/common/*.js', 'js/noteclock.js', 'js/noteclock.spec.js'],
                }
            },
            notepitcher: {
                options: {
                    files: ['js/common/*.js', 'js/notepitcher.js', 'js/notepitcher.spec.js'],
                }
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-karma');

    //  Tasks
    grunt.registerTask('default', ['karma:noteclock', 'karma:notepitcher']);
};
