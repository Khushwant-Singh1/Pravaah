#Fetch Ai agents imports
from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low


# langchain imports
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from langchain_core.messages import AIMessage
from langchain_core.chat_history import (
    BaseChatMessageHistory,
    InMemoryChatMessageHistory,
)
from langchain_core.runnables.history import RunnableWithMessageHistory

from dotenv import load_dotenv
load_dotenv()

store = {}

def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
    return store[session_id]


class Request(Model):
    data: str

class Response(Model):
    message: str


SimpleAgent = Agent(
    name="ChatBot Agent",
    port=8000,
    seed="ChatBot agent",
    endpoint=["http://127.0.0.1:8000/submit"],
)

fund_agent_if_low(SimpleAgent.wallet.address())

@SimpleAgent.on_event('startup')
async def agent_details(ctx: Context):
    ctx.logger.info(f'Simple Agent Address is {SimpleAgent.address}')
    
@SimpleAgent.on_query(model=Request, replies={Response})
async def query_handler(ctx: Context, sender: str, msg: Request):
    try:
        query = msg.data
        data = ctx.storage.get("data") 
        ctx.logger.info(f'Data we already have:  {data}')
        prompt = f"""
            You are a customer service proider. You are supposed to answer the user's query in a courteous and a precise way.
            query = {query}
            """
        model = ChatOpenAI(model="gpt-3.5-turbo")
        with_message_history = RunnableWithMessageHistory(model, get_session_history)
        config = {"configurable": {"session_id": "abc2"}}
        response = with_message_history.invoke(
            [HumanMessage(content=prompt)],
            config=config,
            )
        ctx.logger.info(response)
        ctx.logger.info("post")
        await ctx.send(sender, Response(message=response.content))
    except Exception as ex:
        ctx.logger.warning(ex)

if __name__ == "__main__":
    SimpleAgent.run()