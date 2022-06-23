FROM debian:bullseye

RUN apt-get update && apt-get install -y \
    bison \
    flex   \
    cmake \
    g++ \
    libmpfr-dev 

WORKDIR /src/minizinc
ADD https://github.com/MiniZinc/MiniZincIDE/releases/download/2.5.5/MiniZincIDE-2.5.5-bundle-linux-x86_64.tgz MiniZincIDE-2.5.5-bundle-linux-x86_64.tar.gz
RUN tar -xf MiniZincIDE-2.5.5-bundle-linux-x86_64.tar.gz

WORKDIR /src
COPY . /src
RUN apt-get install -y \
    python3-pip \
    python3-dev


ENV PATH="/usr/bin:${PATH}"

RUN pip3 install --no-cache-dir -r requirements.txt

ENV PATH="/src/minizinc/MiniZincIDE-2.5.5-bundle-linux-x86_64/bin:${PATH}"
ENV LD_LIBRARY_PATH="/src/minizinc/MiniZincIDE-2.5.5-bundle-linux-x86_64/lib:${LD_LIBRARY_PATH}"
ENV QT_PLUGIN_PATH="/src/minizincMiniZincIDE-2.5.5-bundle-linux-x86_64/plugins:${QT_PLUGIN_PATH}"

EXPOSE 5000
CMD ["python3", "./src/app.py"]