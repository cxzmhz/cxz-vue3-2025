FROM node:20
# WORKDIR 表示工作目录
WORKDIR /cxzvue3
# 这里先拷贝package*.json相关文件过去安装依赖再把源码拷贝过去是因为镜像是一层一层构建的，如果当前层的代码没有变，下次构建的时候就不会重新构建
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.23.1-alpine
# --from=0 表示从上一步构建的镜像中拷贝文件
COPY --from=0 /cxzvue3/dist /usr/share/nginx/html
# 这里表示要暴露容器的3010端口，不过nginx的默认端口是80，所以还要修改nginx的配置文件default.conf，
EXPOSE 3010
# daemon off：daemon代表守护进程（后台运行），off代表前台运行，因为如果在docker中使用守护进程运行的话，docker会检测不到进程在运行，就会关闭，所以需要让nginx以前台运行
CMD ["nginx", "-g", "daemon off;"]