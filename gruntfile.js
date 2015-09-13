/**
	grunt插件分为两类。
	第一类是grunt团队贡献的插件，这些插件的名字前面都带有“contrib-”前缀，而且在插件列表中有星号标注。
	第二类是第三方提供的插件，不带有这两个特征。
		Contrib-jshint——javascript语法错误检查；
		Contrib-watch——实时监控文件变化、调用相应的任务重新执行；
		Contrib-clean——清空文件、文件夹；
		Contrib-uglify——压缩javascript代码
		Contrib-copy——复制文件、文件夹
		Contrib-concat——合并多个文件的代码到一个文件中
		karma——前端自动化测试工具
**/

// 包装函数 
module.exports = function(grunt) {
	// 配置任务，所有插件的配置信息
	grunt.initConfig({

		// 获取 package.json 信息
		pkg: grunt.file.readJSON('package.json'),

		// 配置uglify插件，压缩js
		uglify: {
			options: {
				stripBanners: true,
				banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%=gurnt.template.today("yyyy-mm-dd")%> */\n'
			},
			build: {
				src: 'app/scripts/angular/*.js',
				dest: 'build/<%=pkg.name%>-<%=pkg.version%>.min.js'
			}
		},

		// 配置cssmin插件，压缩css
		cssmin: {
			options: {
				stripBanners: true,
				banner: '/*! <%=pkg.name%>-<%=pkg.version%>.css <%=gurnt.template.today("yyyy-mm-dd")%> */\n'
			},
			build: {
				src: 'app/styles/default/default.css',
				dest: 'build/<%=pkg.name%>-<%=pkg.version%>.min.css'
			}
		},

		// 配置jshint插件，js语法
		jshint: {
			build: ['gruntfile.js', 'app.js', 'app/scripts/angular/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// 配置csslint插件，css语法
		csslint: {
			build: ['app/styles/*'],
			options: {
				csslintrc: '.csslintrc'
			}
		},

		// 配置watch插件，自动检测修改
		watch: {
			// build: {
			// 	files: ['app.js', 'app/scripts/*', 'app/styles/*'],
			// 	tasks: ['jshint', 'csslint'],
			// 	options: { spawn: false }
			// }
			html: {
				files: ['app/views/**/*.html'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['app.js', 'app/scripts/**/*.js', 'server/models/**/*.js', 'server/models/**/*.js'],
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			css: {
				files: ['app/styles/**'],
				tasks: ['csslint'],
				options: {
					livereload: true
				}
			}
		},

		nodemon: {
			dev: {
				file: 'app.js',
				args: [],
				ignoreFiles: ['README.md', 'node_modules/**', '.DS_Store'],
				watchedExtensions: ['js'],
				watchedFolders: ['./'],
				debug: true,
				delayTime: 1,
				env: {
					PORT: 5700
				},
				cwd: __dirname
			}
		},

		concurrent: {
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		}
	});

	// 加载插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	// 注册任务
	grunt.registerTask('default', ['concurrent']);
	grunt.registerTask('compress js', ['jshint', 'uglify']);
	grunt.registerTask('compress css', ['csslint', 'cssmin']);
};