# 基础镜像使用Nginx
FROM nginx:alpine

# 将dist文件夹内容复制到Nginx服务器的html目录
COPY dist/. /etc/nginx/html/

# 如果需要修改Nginx配置，可以复制自定义配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露80端口
EXPOSE 80

# 容器启动时运行Nginx
CMD ["nginx", "-g", "daemon off;"]