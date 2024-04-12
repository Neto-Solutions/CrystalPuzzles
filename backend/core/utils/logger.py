import logging
import sys

# get logger
logger = logging.getLogger()

# create formatter
formatter = logging.Formatter(fmt="%(asctime)s - %(levelname)s - %(message)s")

# create handlers
stream_handler = logging.StreamHandler(sys.stdout)
file_handler = logging.FileHandler("app.log")

# set formatter
stream_handler.setFormatter(formatter)
file_handler.setFormatter(formatter)

# add handlers to the logger
logger.handlers = [stream_handler, file_handler]

# set log-level
logger.setLevel(logging.INFO)
