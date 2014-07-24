module.exports = function(grunt) {

    grunt.initConfig({
        // uglify: {
        //     options: {
        //         mangle: false,
        //     },
        //     prod: {
        //         files: {
        //             'js/fm.min.js' : ['js/fm.js']
        //         }
        //     }
        // },
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
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');

    //  Tasks
    grunt.registerTask('default', ['karma:noteclock', 'karma:notepitcher']);
};