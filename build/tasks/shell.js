module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-shell');

    grunt.config('shell', {
        options: {
            stderr: false
        },
        push_prod_s3: {
            command: 'aws --profile deathbearghost s3 cp _site/ s3://sue.codes --recursive --include \'*\' --acl \'public-read\''
        }
    });
};
